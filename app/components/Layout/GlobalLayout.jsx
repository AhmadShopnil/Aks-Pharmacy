'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import AuthModal from '../Auth/AuthModal';
import { closeAuthModal, selectAuthModalOpen } from '@/lib/redux/features/ui/uiSlice';
import { Toaster } from 'react-hot-toast';

export default function GlobalLayout({ children }) {
    const dispatch = useAppDispatch();
    const isAuthModalOpen = useAppSelector(selectAuthModalOpen);

    return (
        <>
            {children}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => dispatch(closeAuthModal())}
            />
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
}
