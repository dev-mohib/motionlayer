// @ts-nocheck
import { useEffect } from 'react';
import Checkbox from '@/Components/css/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/css/InputError';
import InputLabel from '@/Components/css/InputLabel';
import PrimaryButton from '@/Components/css/PrimaryButton';
import TextInput from '@/Components/css/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword } : any) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <div className='bg-gray-200 min-h-screen grid place-content-center'>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <h1 className='text-3xl my-4'>Signin - <b className='text-red-400'>Motionlayer</b></h1>
          <div className='w-full shadow-2xl rounded-2xl p-10 px-20'>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" children={undefined} />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    
                    <InputLabel htmlFor="password" value="Password" children={undefined} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
          </div>
        </div>
    );
}
