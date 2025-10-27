'use client';
import React from 'react';
import Dropdown from '../Dropdown';

interface AccountReusebleHeaderProps {
    innerText: string;
    showMenu?: boolean;
    editState?: boolean;
    setEditState?: React.Dispatch<React.SetStateAction<boolean>>;
    setAnyState?: React.Dispatch<React.SetStateAction<boolean>>;
}
const AccountReusebleHeader = ({
    innerText,
    showMenu,
    editState,
    setEditState,
    setAnyState,
}: AccountReusebleHeaderProps) => {
    const setEditTrue = () => {
        if (setEditState) {
            setEditState(true);
        }
        if (setAnyState) {
            setAnyState(false);
        }
    };
    return (
        <div className="flex justify-between items-center p-4 w-full">
            <h1 className="text-lg font-semibold capitalize">{innerText}</h1>
            {showMenu && (
                <Dropdown
                    innerText="edit"
                    onclick={setEditTrue}
                    disabled={editState}
                />
            )}
        </div>
    );
};

export default AccountReusebleHeader;
