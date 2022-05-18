import React from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';

const TodoList = () => {
    const [user, ,] = useAuthState(auth);
    console.log(user.email);

    const { data, isLoading } = useQuery(['get-todo', user?.email], () =>
        fetch(`http://localhost:5000/get-task?email=${user?.email}`).then(res => {
            console.log(res);
            return res.json();
        }))
    console.log(data);

    if (isLoading) {
        return <h1 style={{ paddingTop: '300px' }} className='text-center'>Please wait....</h1>
    }

    return (
        <div className='bg-light p-5 rounded mt-3'>
            <div className='border-bottom'>
                <h6>Todo List</h6>
            </div>
        </div>
    );
};

export default TodoList;