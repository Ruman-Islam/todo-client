import React from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';

const TodoList = ({ update }) => {
    const [user, ,] = useAuthState(auth);

    const { data, isLoading } = useQuery(['get-todo', user?.email, update], () =>
        fetch(`http://localhost:5000/get-task?email=${user?.email}`).then(res => res.json()))

    if (isLoading) {
        return <h1 style={{ paddingTop: '300px' }} className='text-center'>Please wait....</h1>
    }

    return (
        <div className='bg-light p-5 rounded mt-3'>
            <div className='border-bottom'>
                <h6>Todo List</h6>
            </div>
            <table class="table table-striped">
                {data.length > 0 &&
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tile</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>}
                <tbody>
                    {data?.map((todo, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td></td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;