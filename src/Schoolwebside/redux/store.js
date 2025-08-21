import { configureStore } from "@reduxjs/toolkit";
import userMessageSlice from "./slicer/userMessageSlicer.js"
import authSlice from "./slicer/auth.js";
import teacherSlice from "./slicer/teacherSlice.js";
import roleSlice from "./slicer/role.js";
import meeSlice from "./slicer/mee.js";
import testimonialSlice from "./slicer/testominal.js";


 const store = configureStore({
    reducer: {
        message: userMessageSlice,
        auth: authSlice,
        teacher:teacherSlice,
        role: roleSlice,
        mee: meeSlice,
        testimonial: testimonialSlice
    }
});

export default store;