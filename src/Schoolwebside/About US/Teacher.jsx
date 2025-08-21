import React from 'react';

const Teacher = () => {
    const teachers = [
        {
            img: "/image/1.jpg",
            alt: 'teacher',
            name: "Sushil Dahal",
            Position: "Teacher",
            Faculty: "BICTE",
            teacherOfTo: "Class 3"
        },
        {
            img: "/image/1.jpg",
            alt: 'teacher',
            name: "Sushil Dahal",
            Position: "Teacher",
            Faculty: "BICTE",
            teacherOfTo: "Class 3"
        },
        {
            img: "/image/1.jpg",
            alt: 'teacher',
            name: "Sushil Dahal",
            Position: "Teacher",
            Faculty: "BICTE",
            teacherOfTo: "Class 3"
        }
    ];

    return (
        <div className='   lg:flex flex-col justify-evenly '>
        <div className=' px-4 mt-20 grid  gap-20  lg:grid-cols-3'>
            {teachers.map((item, index) => (
                <div key={index} className='h-[600px] lg:w-[500px] w-[90vw] bg-slate-500 shadow-2xl  p-4'>
                    <div className=' gap-4 text-xl lg:text-2xl font-semibold'>
                        <div className='flex flex-col  mt-5 gap-2 items-center'>
                        <img
                            src={item.img}
                            alt={item.alt}
                            className='object-cover rounded-full mt-4 h-[300px] w-[300px]'
                        />
                        </div>
                        <div className='flex flex-col gap-2 mt-5 justify-start '>
                        <div>Name: {item.name}</div>
                        <div>Position: {item.Position}</div>
                        <div>Faculty: {item.Faculty}</div>
                        <div>Teacher Up  to Grade  : {item.teacherOfTo}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default Teacher;
