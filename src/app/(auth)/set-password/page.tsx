import React, { Suspense } from "react";
import SetPasswordForm from "./_components/SetPasswordForm";

export default function SetPasswordPage(): React.ReactElement {
    return (
        <Suspense fallback={<div />}>
            <SetPasswordForm />
        </Suspense>
    );
}