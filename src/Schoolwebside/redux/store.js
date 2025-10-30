import { configureStore } from "@reduxjs/toolkit";
import userMessageSlice from "./slicer/userMessageSlicer.js"
import authSlice from "./slicer/auth.js";
import teacherSlice from "./slicer/teacherSlice.js";
import roleSlice from "./slicer/role.js";
import meeSlice from "./slicer/mee.js";
import testimonialSlice from "./slicer/testominal.js";
import schoolReducer  from './slicer/setting.js'
import mvvReducer from './slicer/missionVisionValues.js'
import coursesReducer from './slicer/courses.js'


 const store = configureStore({
    reducer: {
        message: userMessageSlice,
        auth: authSlice,
        teacher:teacherSlice,
        role: roleSlice,
        mee: meeSlice,
        testimonial: testimonialSlice,
        setting:schoolReducer,
        mvv: mvvReducer,
        courses: coursesReducer
    }
});

export default store;