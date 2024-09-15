/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react';
import CreateIcon from '../../component/Icon/CreateIcon'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { createCategory, deleteCategory, showCategory, updateCategory } from '../../features/categoryDetailsSlice';

const ManageCategory = () => {


    // crate category state management
    const [category, setCategory] = useState({})

     // update category state management
     const [updatecategory, setUpdateCategory] = useState({})

    // react bootstrap modal show for create category
    const [show, setShow] = useState(false);
    // react bootstrap modal show for update category
    const [showUpdate, setShowUpdate] = useState(false);

    const dispatch = useDispatch();


    // start  crate category 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // get category value when onchange input
    const getCategory = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    // submit create cateogry
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(category))
        setShow(false)
    }

    // start read category
    const { categories, loading } = useSelector((state) => state.category);
    // console.log(categories)

    useEffect(() => {
        dispatch(showCategory())
    }, [])


    // ========= start update category ============

    const handleUpdateClose = () => setShowUpdate(false);

    // show bootstrap modal and show value update category name
    const handleShowUpdate = (id) => {
        setShowUpdate(true)
        categories.map(item => {
            if(item.id === id){
                updatecategory.category_name = item.category_name;
                updatecategory.id = id;
            }
        })
    };

    // onchange update category
    const getUpdateCategory = (e) => {
        setUpdateCategory({ ...updatecategory, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        // console.log(updatecategory)
        dispatch(updateCategory(updatecategory))
        setShowUpdate(false)
    }

    // delete category
    const handleDelete = (id) => {
        dispatch(deleteCategory(id))
        setShowUpdate(false)
    }


    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-end pb-4'>
                <button type="button" class="btn btn-info" onClick={handleShow}>Create Category<i class="bi bi-plus"></i></button>
            </div>
            <div className="row">

                <div className="col-lg-12 table-responsive">
                    <table id="VisitorDt" class="table table-bordered" cellspacing="0" width="100%">
                        <thead class="table-dark ">
                            <tr>
                                <th class="th-sm text-center">ID</th>
                                <th class="th-sm text-center">Category Name</th>
                                <th class="th-sm text-center">Category Slug</th>
                                <th class="th-sm text-center">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories?.map((item) => {
                                    return (
                                        <tr class="text-center" key={item.id}>
                                            <td class="th-sm ">{item.id}</td>
                                            <td class="th-sm ">{item.category_name}</td>
                                            <td class="th-sm ">{item.category_name}</td>

                                            <td class="th-sm d-flex gap-3 justify-content-center">
                                                <a href="#" type="button"
                                                    class="btn btn-info btn-circle btn-sm m-1" onClick={() => handleShowUpdate(item.id)}><i class="fas fa-edit"></i></a>

                                                <a type="button" class="btn btn-danger btn-circle btn-sm m-1" onClick={()=>handleDelete(item.id)}><i class="fas fa-trash"></i></a>


                                            </td>

                                        </tr>
                                    )
                                })
                            }




                        </tbody>
                    </table>
                </div>

                {/* create  modal */}
                <Modal show={show} onHide={handleClose}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary btn-sm' onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <h2 className="text-center">Create Category</h2>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="row pb-3">
                                <div class="col-lg-12 py-2">
                                    <label>Category Name</label>
                                    <input required type="text" class="form-control" name="category_name" placeholder="Enter Category Name" onChange={getCategory} />
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>

                        </form>
                    </Modal.Body>

                </Modal>


                {/* update modal */}
                <Modal show={showUpdate} onHide={handleUpdateClose}>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-primary btn-sm' onClick={handleUpdateClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <h2 className="text-center">Create Category</h2>
                    <Modal.Body>
                        <form onSubmit={handleUpdate}>
                            <div className="row pb-3">
                                <div class="col-lg-12 py-2">
                                    <label>Category Name</label>
                                    <input required type="text" class="form-control" name="category_name" value={updatecategory.category_name} onChange={getUpdateCategory} />
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                Submit
                            </button>

                        </form>
                    </Modal.Body>

                </Modal>


            </div>
        </div>
    );
};

export default ManageCategory;