import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";
import auth from '../firebase/firebaseConfig';
import Spinner from './Spinner';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const TodoList = ({ todo }) => {
    const [user, ,] = useAuthState(auth);
    const [completed, setCompleted] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);

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


    const { data, isLoading } = useQuery(['get-todo', user?.email, todo, completed, pageNumber], () =>
        fetch(`https://serene-lowlands-71701.herokuapp.com/get-task?email=${user?.email}&limit=${4}&pageNumber=${pageNumber}`).then(res => {
            console.log(res);
            return res.json();
        }))

    const completeTask = id => {
        fetch(`https://serene-lowlands-71701.herokuapp.com/update-task/${id}`, {
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
        fetch(`https://serene-lowlands-71701.herokuapp.com/delete-task/${id}`, {
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

    console.log(data);
    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className='bg-light p-5 rounded mt-3'>
            <div className='border-bottom'>
                <h6>Todo List</h6>
            </div>
            <table className="table">
                {data?.result?.length > 0 &&
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tile</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>}
                <tbody>
                    {data?.result?.map((todo, index) =>
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{todo.status ? <strike>{todo.title}</strike> : <span>{todo.title}</span>}</td>
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
            {data?.result?.length > 0 &&
                <Pagination isLoading={isLoading} pageNumber={pageNumber} setPageNumber={setPageNumber} count={data.count} />}
        </div>
    );
};

export default TodoList;