"use client"
import React, { useEffect } from 'react';
import { logout } from './auth/auth';
import { Icon } from '@iconify/react/dist/iconify.js';


const Signout: React.FC = () => {
    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Icon icon="eos-icons:bubble-loading"  style={{color: "#fff"}} />
        </div>
    );
};

export default Signout;