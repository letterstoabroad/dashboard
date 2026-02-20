import OtpForm from "./_components/OtpForm";
import {Suspense} from "react";

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div />}>
            <OtpForm />
        </Suspense>
    );
}