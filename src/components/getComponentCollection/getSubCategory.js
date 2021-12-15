import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {API} from "../../tools/constans";
import "./css/style.css";
function GetSubCategory(props) {
    const [subCategory, setSubCategory] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [editSubCategory, setEditSubCategory] = useState({category: "", subcategoryname: "", description: ""})
    const [item, setItem] = useState('');
    const [deletes, setDeletes] = useState('');
    const [inputV, setInputV] = useState('');
    const [ide, setIde] = useState('');
    const {handleSubmit} = useForm();
    const onSubmit = (reset) => console.log(reset);
    useEffect(() => {
        axios.get(API+"api/Subcategory/").then((res) => {
            setSubCategory(res.data)
        })
    }, []);
    useEffect(() => {
        axios.get(API+"api/Category/").then(res => {
            setCategoryList(res.data)
        });
    }, []);

    function editSubCategoryId(id) {
        subCategory.map(items => {
            if (items.id === id) {
                setItem(items)
                categoryList.map(category => {
                    if (category.id === items.category) {
                        setIde(category)
                    }
                });
                editSubCategory.category = items.category;
                editSubCategory.subcategoryname = items.subcategoryname;
                editSubCategory.description = items.description;

            }
        });
    }

    function changeEdit(e) {
        setEditSubCategory({
            ...editSubCategory,
            [e.target.name]: e.target.value
        })
    }

    function AddEdit() {

        axios.put(API+`api/Subcategory/${item.id}/`, editSubCategory).then(res => {
            console.log(res)
        });
    }


    function deleteItems(items) {
        setDeletes(items)
    }

    function DeleteSubcategory() {
        subCategory.map(item => {

            if (item.id === deletes.id) {

                axios.delete(API+`api/Subcategory/${deletes.id}/`).then(res => {
                    console.log(res)
                });
                setInputV('');
            }

        });
    }

    function inputVal(e) {
        setInputV(e.target.value)
    }

    function inputValueReset() {
        editSubCategory.category = '';
        editSubCategory.subcategoryname = '';
        editSubCategory.description = '';
            }

    return (
        <div>
            <div className="getBrand">
                <div className="container">
                    <Link to={"/admin/addSubCategory"} className="w-100 d-flex justify-content-end">
                        <button className="btn btn-success mb-4">Add Subcategory</button>
                    </Link>
                    <div className="title">
                        <div className="row nav">
                            <div className="col-md-1 li">T/r</div>
                            <div className="col-md-3 li">Name</div>
                            <div className="col-md-3 li">Description</div>
                            <div className="col-md-2 li">Category</div>
                            <div className="col-md-1 li">Edit</div>
                            <div className="col-md-1 li">Delete</div>
                        </div>
                    </div>
                    <div className="menu">
                        {subCategory.map((item, index) => {
                            return <div className="row nav" key={item.id}>
                                <div className="col-md-1 nav-item">{index + 1}</div>
                                <div className="col-md-3 nav-item">{item.subcategoryname}</div>
                                <div className="col-md-3 nav-item">{item.description}</div>
                                <div className="col-md-1 nav-item">{item.category}</div>
                                <div className="col-md-1 nav-item">
                                    <button className="btn btn-warning" onClick={() => editSubCategoryId(item.id)}
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">Edit
                                    </button>
                                </div>
                                <div className="col-md-1 nav-item">
                                    <button className="btn btn-danger" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => deleteItems(item)}>Delete
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="subcategory">
                                    <div className="container">
                                        <h2 className="title">Edit Subcategory</h2>
                                        <div className="row">
                                            <div className="col-md-12 subcategory-body">
                                                <form onSubmit={handleSubmit(onSubmit)} className="form">
                                                    <label htmlFor="category">Category name</label>
                                                    <select name="category" onChange={changeEdit} id="category">
                                                        <option value={ide.id}>{ide.categoryname}</option>
                                                        {categoryList.map(item => {
                                                            return <option defaultValue={ide.categoryname} value={item.id} key={item.id}>{ item.categoryname}</option>
                                                        })}
                                                    </select>
                                                    <label htmlFor="subcategory">Subcategory name</label>
                                                    <input type="text" defaultValue={item.subcategoryname}
                                                           onChange={changeEdit} name="subcategoryname"
                                                           id="subcategory"/>
                                                    <label htmlFor="des">Description</label>
                                                    <input type="text" name="description"
                                                           defaultValue={item.description} onChange={changeEdit}
                                                           id="des"/>
                                                    <button type="reset" className="btn btn-secondary d-inline-block "
                                                            data-bs-dismiss="modal" name="close"
                                                            onClick={inputValueReset}>Close
                                                    </button>

                                                    <button onClick={AddEdit} data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            className="btn btn-success mx-3">Submit
                                                    </button>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                     tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="text-center">Delete SubCategory</h4>
                                {/*<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>*/}
                            </div>
                            <div className="modal-body">
                                <h6>
                                    Subcategory va uning qo'shimchalari o'chgandan so'ng qaytarib bo'lmaydi.
                                    <br/>
                                    <b className="bg-secondary p-1 px-2 mt-1 "
                                       style={{borderRadius: "5px"}}> {deletes.subcategory_name} </b> uni butunlay
                                    oʻchirib tashlamoqchi ekanligingizni tasdiqlang:
                                </h6>

                                <input type="text" className="form-control  mt-2" onChange={inputVal} value={inputV}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                </button>
                                {inputV === deletes.subcategory_name ?
                                    <button className="btn btn-danger" onClick={DeleteSubcategory}
                                            data-bs-dismiss="modal">Delete</button> :
                                    <button className="btn btn-danger"
                                            disabled>Delete</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetSubCategory;
/*import React from 'react';
import { useForm } from 'react-hook-form';

export default function GetSubCategory() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('firstName')} /> {/!* register an input *!/}
            <input {...register('lastName', { required: true })} />
            {errors.lastName && <p>Last name is required.</p>}
            <input {...register('age', { pattern: /\d+/ })} />
            {errors.age && <p>Please enter number for age.</p>}
            <input type="submit" />
        </form>
    );
}
import React from "react";*/

/*import { useForm } from "react-hook-form";

export default function App() {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            <input {...register("lastName")} />
            <input {...register("email")} />

            <button type="reset">Submit</button>
        </form>
    );
}*/
/*
import React from "react";
import {useForm} from "react-hook-form";


export default function GetSubCategory() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data, e) => {};

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>First name</label>
            <input type="text" {...register("firstName", { required: true })} />
            {errors.firstName && <p>This is required</p>}

            <label>Last name</label>
            <input type="text" {...register("lastName")} />

            <input type="submit" />
            <input
                style={{ display: "block", marginTop: 20 }}
                type="reset"
                value="Standard Reset Field Values"
            />
          {/!*  <input
                style={{ display: "block", marginTop: 20 }}
                type="button"
                onClick={() =>
                    reset({
                        firstName: "bill",
                        lastName: "luo"
                    })
                }
                value="Reset with values"
            />*!/}
        </form>
    );
}*/