import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import auth from '../firebase/firebaseConfig';
import Spinner from './Spinner';
import { useState } from 'react';
import { toast } from 'react-toastify';

const TodoList = ({ todo }) => {
    const [user, ,] = useAuthState(auth);
    const [completed, setCompleted] = useState(false)

    const notifyInfo = (message) => {
        toast.info(message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'text-sm'
        });
    }

    const notifyWarning = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'text-sm'
        });
    }


    const { data, isLoading } = useQuery(['get-todo', user?.email, todo, completed], () =>
        fetch(`http://localhost:5000/get-task?email=${user?.email}`).then(res => res.json()))

    const completeTask = id => {
        fetch(`http://localhost:5000/update-task/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setCompleted(!completed);
                    notifyInfo('Todo updated!');
                }
            })
    }

    const deleteTask = id => {
        fetch(`http://localhost:5000/delete-task/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setCompleted(!completed);
                    notifyWarning('Todo removed')
                }
            });
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='bg-light p-5 rounded mt-3'>
            <div className='border-bottom'>
                <h6>Todo List</h6>
            </div>
            <table className="table">
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
                            <td>{todo.status ? <strike>{todo.description}</strike> : <span>{todo.description}</span>}</td>
                            <td>
                                <span
                                    onClick={() => completeTask(todo._id)}
                                    className='text-success' role='button'>
                                    <AiOutlineCheckCircle />
                                </span>
                                <span
                                    onClick={() => deleteTask(todo._id)}
                                    className='ms-2 text-danger' role='button'>
                                    <AiOutlineCloseCircle />
                                </span>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;