import { clerkClient } from '@clerk/express'
import Course from '../Models/Course.js';
import { v2 as cloudinary } from 'cloudinary'
import { Purchase } from '../Models/purchase.js';
import User from '../Models/User.js'

//update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {

        // console.log("req.auth:", req.auth); // Debug log
        const userId = req.auth.userId

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is missing" });
        }

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })
        res.json({ success: true, message: 'You can publish your course now' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Add New Course
// Add New Course
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body;
        const imageFile = req.file; // File sent with the request
        const educatorId = req.auth.userId; // Educator ID from auth

        // Check if image file is attached
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Thumbnail Not Attached" });
        }

        // Parse the course data
        const parsedCourseData = JSON.parse(courseData);
        parsedCourseData.educator = educatorId;

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        if (!imageUpload || !imageUpload.secure_url) {
            return res.status(500).json({ success: false, message: "Failed to upload thumbnail to Cloudinary" });
        }

        // Create a new course with the thumbnail URL
        const newCourse = new Course({
            ...parsedCourseData,
            courseThumbnail: imageUpload.secure_url,
        });

        // Save the course to the database
        await newCourse.save();

        res.json({ success: true, message: "Course Added"});
    } catch (error) {
        console.error("Error in addCourse:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};



//Get Educator Courses
export const getEducatorCourses = async (req, res) => {

    try {
        const educator = req.auth.userId

        const courses = await Course.find({ educator })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get educator dashboard data ( total eaning, enrolled students, no. of courses)

export const educatorDashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId

        const courses = await Course.find({ educator });
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);

        //Total earning
        const purchase = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        })

        const totalEarning = purchase.reduce((sum, purchase) => sum + purchase.amount, 0);

        //collect unique enrolled student Ids with their courses titles
        const enrolledStudentsData = [];
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            });
        }

        res.json({
            success: true, dashboardData: {
                totalEarning,
                enrolledStudentsData, totalCourses
            }
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//get enrolled students data with purchase data
export const getEnrolledStudentsData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator });
        const courseIds = courses.map(course => course._id);

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseData: purchase.createdAt
        }));

        res.json({ success: true, enrolledStudents })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}