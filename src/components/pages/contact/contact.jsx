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
            <div className='page-div bg-green-300'>
                <h1 className='text-4xl px-10 font-bold p-2'>
                    Contact The Noob
                </h1>
                <div>
                    <div className='mt-0 pt-4 p-4 md:p-10'>
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
                            className='btn bg-gray-300 text-2xl'
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
