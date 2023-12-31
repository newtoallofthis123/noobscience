import { useState } from 'react';

export default function Form() {
    const [responseMessage, setResponseMessage] = useState('');

    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.message) {
            setResponseMessage(data.message);
        }
    }

    return (
        <form onSubmit={submit}>
            <div className='page-div text-dark bg-lime-300'>
                <h1 className='text-4xl md:px-10 font-bold px-2 pt-5'>
                    Contact The Noob
                </h1>
                <p  className='md:px-10 px-2 pt-5 font-normal text-xl leading-relaxed'>
                    Is this a overengineered contact form? Yes. Was it fun to make? No.
                    However, it is a good way to prevent spam and I can use it to
                    practice my backend skills. So, if you want to contact me, fill out
                    the form below and I will get back to you as soon as I can.
                </p>
                <div>
                    <div className='mt-0 pt-4 p-1 md:p-10'>
                        <h2>
                            <span className='text-2xl font-base'>Enter Your Name:</span>{' '}
                        </h2>
                        <input type='text' className='md:w-3/5 w-full p-3 border-2 border-black text-xl rounded-md my-3' name='name' placeholder='Name' />
                        <h2>
                            <span className='text-2xl font-base'>Your Email Where I can Reach You:</span>{' '}
                        </h2>
                        <input type='email' className='md:w-3/5 w-full p-3 border-2 border-black text-xl rounded-md my-3' name='email' placeholder='Email' />
                        <h2>
                            <span className='text-2xl font-base'>Your Message, Keep it clean:</span>{' '}
                        </h2>
                        <textarea
                            name='message'
                            placeholder='Message'
                            className='md:w-3/5 w-full p-3 border-2 border-black text-xl rounded-md my-3'
                            rows='5'
                        ></textarea>
                        <p></p>
                        <button
                            className='btn bg-gray-800 py-2 text-xl'
                            type='submit'>
                            Send The Mail
                        </button>
                        <p className='py-4'>
                            {
                                !responseMessage && (
                                    <>
                                        By clicking the button, you agree to the{' '}
                                        <a className='underline' href='/privacy-policy'>Privacy Policy</a>
                                    </>
                                )
                           }
                            {responseMessage && <p>{responseMessage}</p>}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
