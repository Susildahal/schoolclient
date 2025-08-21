 import React from "react";
 const PublicRoute = ({ children }) => {
    const flag = localStorage.getItem('flag');
    React.useEffect(() => {
        if (flag) window.location.replace('/adminoutlet/AdminHome');
    }, [flag]);
    return !flag ? children : null;
};

export default PublicRoute;