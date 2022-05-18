import React from 'react';
import { useForm } from 'react-hook-form';
import TodoList from '../components/TodoList';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import './ToDo.css';
import { toast } from 'react-toastify';

const ToDo = () => {
    const [user, ,] = useAuthState(auth);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched'
    });

    const notifySuccess = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'text-sm'
        });
    }

    // handle submit 
    const onSubmit = async (data) => {
        const todo = {
            title: data.title,
            description: data.description,
            status: false,
            email: user?.email
        }
        fetch('http://localhost:5000/post-task', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                notifySuccess('Todo added!');
            })
    };

    return (
        <div className='todo-container'>
            <div className='wrapper'>
                <div className='section-header'>
                    <h6>To add a todo, just fill the form below and click in add todo.</h6>
                </div>
                <div className='todo-body p-5 bg-light'>
                    <div className='border-bottom'>
                        <h6>Create a new todo</h6>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}
                        className='input-container'>
                        <div className="input-group mt-3">
                            <input type="text" className="form-control" placeholder="Title" aria-label="Recipient's username" ariaDescribedBy="basic-addon2" {...register("title", {
                                required: {
                                    value: true,
                                    message: 'Title is Required'
                                }
                            })} />
                        </div>
                        <label className='text-danger'>
                            {errors.title?.type === 'required' && errors.title?.message}
                        </label>
                        <>
                            <textarea type="text" className="form-control" placeholder="What needs to be done?" aria-label="Recipient's username" ariaDescribedBy="basic-addon2" {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is Required'
                                }
                            })} />
                            <label className='text-danger'>
                                {errors.description?.type === 'required' && errors.description?.message}
                            </label>
                        </>
                        <button type='submit' className="input-group-text" id="basic-addon2">Add todo</button>
                    </form>
                </div>
                <TodoList />
            </div>
        </div>
    );
};

export default ToDo;