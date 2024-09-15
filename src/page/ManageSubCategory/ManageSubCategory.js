/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect } from 'react';
import CreateIcon from '../../component/Icon/CreateIcon'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { showCategory} from '../../features/categoryDetailsSlice';
import { createSubCategory, deleteSubCategory, showSubCategory, updateSubCategory } from '../../features/subCategorySlice';

const ManageCategory = () => {


    // crate category state management
    const [subcategory, setSubCategory] = useState({})

    // update category state management
    const [updatesubcategory, setUpdateSubCategory] = useState({})

    // react bootstrap modal show for create category
    const [show, setShow] = useState(false);
    // react bootstrap modal show for update category
    const [showUpdate, setShowUpdate] = useState(false);

    const dispatch = useDispatch();


    // start  crate category 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // get category value when onchange input
    const getSubCategory = (e) => {
        setSubCategory({ ...subcategory, [e.target.name]: e.target.value })
    }

    // submit create cateogry
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSubCategory(subcategory))
        setShow(false)
    }

    // start read category
    const { subcategories, loading } = useSelector((state) => state.subcategory);
    const { categories, loading2 } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(showSubCategory())
        dispatch(showCategory())
    }, [])


    // ============== start update category ==================

    const handleUpdateClose = () => setShowUpdate(false);

    // show bootstrap modal and show value update category name
    const handleShowUpdate = (id) => {
        setShowUpdate(true)
        subcategories.map(item => {
            if (item.id === id) {
                updatesubcategory.subcategory_name = item.subcategory_name;
                updatesubcategory.category_id = item.category_id;
                updatesubcategory.id = id;
            }
        })
    };

    // onchange update category
    const getUpdateCategory = (e) => {

        setUpdateSubCategory({ ...updatesubcategory, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updatesubcategory.category_id = e.target.category_id.value
        dispatch(updateSubCategory(updatesubcategory))
        setShowUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(deleteSubCategory(id))
        setShowUpdate(false)
    }


    return (
        <div className='container-fluid'>
            <div className='d-flex justify-content-end pb-4'>
                <button type="button" class="btn btn-info" onClick={handleShow}>Create Subcategory<i class="bi bi-plus"></i></button>
            </div>
            <div className="row">
                <div className="col-lg-12 table-responsive">
                    <table id="VisitorDt" class="table table-bordered" cellspacing="0" width="100%">
                        <thead class="table-dark ">
                            <tr>
                                <th class="th-sm text-center">ID</th>
                                <th class="th-sm text-center">Subcategory Name</th>
                                <th class="th-sm text-center">Subcategory Slug</th>
                                <th class="th-sm text-center">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                subcategories?.map((item) => {
                                    return (
                                        <tr class="text-center" key={item?.id}>
                                            <td class="th-sm ">{item?.id}</td>
                                            <td class="th-sm ">{item?.subcategory_name}</td>
                                            <td class="th-sm ">{item?.subcat_slug}</td>

                                            <td class="th-sm d-flex gap-3 justify-content-center">
                                                <a href="#" type="button"
                                                    class="btn btn-info btn-circle btn-sm m-1" onClick={() => handleShowUpdate(item.id)}><i class="fas fa-edit"></i></a>

                                                <a type="button" class="btn btn-danger btn-circle btn-sm m-1" onClick={() => handleDelete(item.id)}><i class="fas fa-trash"></i></a>


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
                    <h2 className="text-center">Create Subcategory</h2>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="row pb-3">
                                <div class="col-lg-12 py-2">
                                    <label>Select Category</label>
                                    <select class="form-control" name='category' aria-label="Default select example" onChange={getSubCategory}>
                                        <option selected>Select Category</option>
                                        {categories?.map((item) => {
                                            return <option value={item.id}>{item.category_name}</option>
                                        })}

                                    </select>
                                </div>
                                <div class="col-lg-12 py-2">
                                    <label>Subcategory Name</label>
                                    <input required type="text" class="form-control" name="subcategory_name" placeholder="Enter Subcategory Name" onChange={getSubCategory} />
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
                    <h2 className="text-center">Update Subcategory</h2>
                    <Modal.Body>
                        <form onSubmit={handleUpdate}>
                            <div className="row pb-3">

                                <div class="col-lg-12 py-2">
                                    <select class="form-control"  name='category_id' aria-label="Default select example" onChange={getSubCategory}>
                                        <option value=''>Select Category</option>
                                        {categories?.map((item) => {
                                            return <option value={item.id} selected={item.id == updatesubcategory.category_id}>{item.category_name}</option>
                                        })}

                                    </select>
                                </div>
                                <div class="col-lg-12 py-2">
                                    <label>Subcategory Name</label>
                                    <input required type="text" class="form-control" name="subcategory_name" value={updatesubcategory.subcategory_name} onChange={getUpdateCategory} />
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