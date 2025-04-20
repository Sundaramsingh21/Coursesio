import Course from "../Models/Course.js";


//Get All Cources
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).select(['-courseContent', '-enrolledStudent']).populate({ path: 'educator' })

        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

//Get Course by id
export const getACourseId = async (req, res) => {

    const { id } = req.params
    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' })

        //Remove lecture Url if ispreviewFre is False
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({ success: true, courseData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


