import React from 'react';
import { useEffect, useState} from 'react';

import Storage from '@aws-amplify/storage';
import API from '@aws-amplify/api';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { createCategory } from '../../graphql/mutations';
import { createItem } from '../../graphql/mutations';
import { deleteItem } from '../../graphql/mutations';
import { updateItem } from '../../graphql/mutations';
import image from '../../assets/images/delete.png';
import image2 from '../../assets/images/edit.png';
import image3 from '../../assets/images/hide.png';

import classes from './EditMenu.module.css';
import { v4 as uuid } from 'uuid';


const EditMenu = (props) => {
    // props = [bucket, region, restaurant, restaurantSetter]
    //const [items, setItems] = useState(null);

    const [categoryAdderOpened, setCategoryAdderOpened] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const [itemAdderOpened, setItemAdderOpened] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemIngredients, setItemIngredients] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [itemSpecialities, setItemSpecilities] =
         useState({vege: false, vegan: false, halal: false, featured: false, hidden: false});
    
    const [currentCategory, setCurrentCategory] = useState(null);

    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [itemToBeDeleted, setItemToBeDeleted] = useState(null);

    const [itemEditorOpened, setItemEditorOpened] = useState(false);
    const [itemToBeEditted, setItemToBeEditted] = useState(null);

    const [loadingMessage, setLoadingMessage] = useState(null);

    const [qrCodeViewerOpened, setQRCodeViewerOpened] = useState(false);

    const qrCodeURLBase = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data='

    console.log('rendering EditMenu')

    const AddCategoryHandler = () => {
        setCategoryAdderOpened(true)
    }

    const onAddCategoryConfirm = async() => {
        console.log('from onAddCategoryConfirm');
        if (categoryName === '') {
            return
        }

        const inputData = { restaurantID: props.restaurant.id, name: categoryName }
        try {
            const newCategoryData = await API.graphql(graphqlOperation(createCategory, { input: inputData }))
            const newCategory = newCategoryData.data.createCategory;

            let newCategories = props.restaurant.categories.items
            if (newCategories) {
                console.log('current category', newCategories)
                console.log('categories with items');
                newCategories.push(newCategory);
                console.log('updated category', newCategories)
            } else {
                console.log('categories empty');
                newCategories = [newCategory]
            }
            
            props.restaurantSetter((prevRestaurant) => {
                let newRestaurant = prevRestaurant;
                newRestaurant.categories.items = newCategories;
                return newRestaurant;
            })
            console.log('from onAddCategoryConfirm success');
        } catch (err) {
            console.log('error creating category:', err);
        }

        setCategoryAdderOpened(false)
    }

    const onAddCategoryCancel = () => {
        setCategoryAdderOpened(false)
    }

    const AddMenuHandler = () => {
        setItemAdderOpened(true)
    }

    const onAddItemConfirm = async() => {
        console.log('onAddItemConfirm');
        if (itemName === '' || !itemImage || itemPrice === '') {
            return
        }

        const extension = itemImage.name.split(".")[1];
        const { type: mimeType } = itemImage;
        const key = `${uuid()}${itemName}.${extension}`;
        const url = `https://${props.bucket}.s3.${props.region}.amazonaws.com/public/${key}`;
        const inputData = { categoryID: currentCategory.id,
                            name: itemName,
                            description: itemDescription,
                            ingredients: itemIngredients,
                            price: itemPrice,
                            image: url,
                            vegan: itemSpecialities.vegan,
                            vege: itemSpecialities.vege,
                            halal: itemSpecialities.halal,
                            featured: itemSpecialities.featured,
                            hidden: itemSpecialities.hidden,
        }

        try {
            // s3 update
            await Storage.put(key, itemImage, {contentType: mimeType});
            // api update
            const newItemData = await API.graphql(graphqlOperation(createItem, { input: inputData }))
            console.log('from onAddItemConfirm: newItemData : ', newItemData);
            const newItem = newItemData.data.createItem;

            props.restaurantSetter((prevRestaurant) => {
                const categoryIndex = prevRestaurant.categories.items.findIndex((obj => obj.id === currentCategory.id))
                let updatedCategory = prevRestaurant.categories.items[categoryIndex];
                if (!(updatedCategory.items)) {
                    updatedCategory = { ...updatedCategory, items: {items: []}}
                }
                prevRestaurant.categories.items[categoryIndex] = updatedCategory;
                prevRestaurant.categories.items[categoryIndex].items.items.push(newItem);
                return prevRestaurant;
            })

        } catch (err) {
            console.log('error creating items:', err);
        }

        setItemAdderOpened(false)
        setItemName('');
        setItemDescription('');
        setItemIngredients('');
        setItemImage(null);
        setItemSpecilities({vege: false, vegan: false, halal: false, featured: false, hidden: false})
        setCategoryAdderOpened(false)
    }
    
    const onAddItemCancel = () => {
        setItemAdderOpened(false)
        setItemName('');
        setItemDescription('');
        setItemIngredients('');
        setItemImage(null);
        setItemSpecilities({vege: false, vegan: false, halal: false, featured: false, hidden: false})
    }

    const onDeleteButtonClicked = (item) => {
        setDeleteModalOpened(true);
        setItemToBeDeleted(item);
    }

    const onDeleteItemCanceled = () => {
        setDeleteModalOpened(false);
        setItemToBeDeleted(null);
    }


    const onDeleteItemConfirmed = async() => {
        try {
            //s3 update
            const deletedKey = itemToBeDeleted.image.replace(`https://${props.bucket}.s3.${props.region}.amazonaws.com/public/`, '');
            await Storage.remove(deletedKey);
            //api update
            const inputData = {id: itemToBeDeleted.id}
            await API.graphql(graphqlOperation(deleteItem, { input: inputData }))
            //restaurant update
            await props.restaurantSetter((prevRestaurant) => {
                const categoryIndex = prevRestaurant.categories.items.findIndex(obj => obj.id == itemToBeDeleted.categoryID)
                const itemIndex = prevRestaurant.categories.items[categoryIndex].items.items.findIndex(obj => obj.id === itemToBeDeleted.id)
                console.log('deleting item index:', itemIndex);
                prevRestaurant.categories.items[categoryIndex].items.items.splice(itemIndex, 1);
                return prevRestaurant;
            })

            console.log('from onItemDeleted', props.restaurant);
        } catch(err) {
            console.log('error deleting item', err);
        }
        setDeleteModalOpened(false);
        setItemToBeDeleted(null);
    }

    const onEditItemButtonClicked = (item) => {
        setItemEditorOpened(true);
        setItemToBeEditted(item);
    }

    const onEditItemCanceled = () => {
        setItemEditorOpened(false);
        setItemToBeEditted(null);
    }

    const onEditItemConfirmed = async() => {
        console.log('onEditItemConfirmed start')
        try {
            //s3 update
            let url = itemToBeEditted.image
            console.log('onEditItemConfirmed 1')
            if (itemImage) {
                //1. s3 delete
                console.log('onEditItemConfirmed 2')
                const deletedKey = itemToBeEditted.image.replace(`https://${props.bucket}.s3.${props.region}.amazonaws.com/public/`, '');
                await Storage.remove(deletedKey);
                //2. s3 upload
                console.log('onEditItemConfirmed 3')
                const extension = itemImage.name.split(".")[1];
                const { type: mimeType } = itemImage;
                const key = `${uuid()}${itemToBeEditted.name}.${extension}`;
                url = `https://${props.bucket}.s3.${props.region}.amazonaws.com/public/${key}`;
                await Storage.put(key, itemImage, {contentType: mimeType});
            }
            console.log('onEditItemConfirmed 4')
            //api update
            const inputData = { 
                                id: itemToBeEditted.id,
                                name: itemToBeEditted.name,
                                description: itemToBeEditted.description,
                                ingredients: itemToBeEditted.ingredients,
                                price: itemToBeEditted.price,
                                image: url,
                                vegan: itemToBeEditted.vegan,
                                vege: itemToBeEditted.vege,
                                halal: itemToBeEditted.halal,
                                featured: itemToBeEditted.featured,
                                hidden: itemToBeEditted.hidden,
            }
            const updatedItemData = await API.graphql(graphqlOperation(updateItem, { input: inputData }))
            const updatedItem = updatedItemData.data.updateItem;
            console.log('onEditItemConfirmed 5')
            //restaurant update
            props.restaurantSetter((prevRestaurant) => {
                const categoryIndex = prevRestaurant.categories.items.findIndex(obj => obj.id == itemToBeEditted.categoryID)
                const itemIndex = prevRestaurant.categories.items[categoryIndex].items.items.findIndex(obj => obj.id === itemToBeEditted.id)
                console.log('deleting item index:', itemIndex);
                prevRestaurant.categories.items[categoryIndex].items.items[itemIndex] = updatedItem;
                return prevRestaurant;
            })
            console.log('onEditItemConfirmed 5')
        } catch(err) {
            console.log('error onEditItemConfirmed:', err)
        }
        setItemEditorOpened(false);
        setItemToBeEditted(null);
    }

    const onHideButtonClicked = async(item) => {
        console.log('from onHideButtonClicked: ', item)
        setLoadingMessage('hiding from Menu...');
        await changeItemVisibility(item, true);
    }

    const onRevealButtonClicked = async(item) => {
        console.log('from onRevealButtonClicked: ', item)
        setLoadingMessage('revealing to Menu ...');
        await changeItemVisibility(item, false);
    }

    const changeItemVisibility = async(item, hidden) => {
        try {
            const inputData = {
                id: item.id,
                hidden: hidden
            }
            const updatedItemData = await API.graphql(graphqlOperation(updateItem, { input: inputData }))
            const updatedItem = updatedItemData.data.updateItem;
            //restaurant update
            props.restaurantSetter((prevRestaurant) => {
                const categoryIndex = prevRestaurant.categories.items.findIndex(obj => obj.id == item.categoryID)
                const itemIndex = prevRestaurant.categories.items[categoryIndex].items.items.findIndex(obj => obj.id === item.id)
                prevRestaurant.categories.items[categoryIndex].items.items[itemIndex] = updatedItem;
                return prevRestaurant;
            })
        } catch(err) {
            console.log('error toggling hidden: ', err)
        }
        setLoadingMessage(null);
    }

    const onQRCodeRequested = () => {
        setQRCodeViewerOpened(true);
    }

    const onQRCodeClosed = () => {
        setQRCodeViewerOpened(false);
    }
        
    return (
        <div className={classes.editMenu}>
            {loadingMessage && (
                <div>
                    <div className={classes.backdrop}/>
                    <div className={classes.loading}>
                        <p className={classes.loadingText}>{loadingMessage}</p>
                    </div>
                </div>
            )}
            {qrCodeViewerOpened && (
                <div>
                    <div className={classes.backdrop} onClick={onQRCodeClosed} />
                    <div className={classes.qrCodeContainer}>
                        <img src={qrCodeURLBase + 'https://new-feature.d1ac5hakempkoy.amplifyapp.com/menu/' + props.restaurant.id}></img>
                    </div>
                </div>

            )}
            { <div>
                <button onClick={onQRCodeRequested}>QR Code</button>
            </div> }
            <div className={classes.content}>
                <div className={classes.mainText}>
                    Your Menu
                </div>
                <div className={classes.editArea}>
                    <div className={classes.categoryArea}>
                        {categoryAdderOpened && (
                            <div>
                                <div className={classes.backdrop} onClick={onAddCategoryCancel} />
                                <div className={classes.editorContainer}>
                                    <div className={classes.editorText}>Category Name: </div>
                                    <div className={classes.editorInputArea}>
                                        <input className={classes.editorInput} type='text' onChange={(e) => {setCategoryName(e.target.value)}} />
                                        <button className={classes.editorConfirmButton} onClick={onAddCategoryConfirm}>Confirm</button>
                                        <button className={classes.editorCancelButton} onClick={onAddCategoryCancel}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={classes.Ctext}>
                            Categories
                        </div>
                        <div className={classes.Citems}>
                        {
                            (props.restaurant.categories.items) && (
                                (props.restaurant.categories.items.length > 0) ? (
                                    props.restaurant.categories.items.map((category, index) => (
                                        <div className={classes.eachItem} key={category.id ? category.id : index}>
                                            {(currentCategory)&&(currentCategory.name==category.name)?
                                            <button className={classes.selectedbutton} onClick={() => setCurrentCategory({id: category.id, name: category.name})}>{category.name}</button>
                                            :<button className={classes.button} onClick={() => setCurrentCategory({id: category.id, name: category.name})}>{category.name}</button>}
                                        </div>
                                    ))
                                ) : (
                                    <p className={classes.defaltText}>Add Your Restaurant Menu Category!</p>
                                )
                            )
                        }
                        </div>
                        <div className={classes.buttonSection}>
                            <button className={classes.Cbutton} onClick={AddCategoryHandler}>+ Add</button>
                        </div>
                    </div>
                    {deleteModalOpened && (
                        <div>
                            <div className={classes.backdrop} onClick={onDeleteItemCanceled} />
                            <div className={classes.deleteModalContainer}>
                                <div className={classes.editorDeleteText}>Do you want to delete this?</div>
                                <button  className={classes.editorYesButton} onClick={onDeleteItemConfirmed}>Yes</button>
                                <button className={classes.editorNoButton} onClick={onDeleteItemCanceled}>No</button>
                            </div>
                        </div>
                    )}
                    {itemEditorOpened && (
                        <div>
                            <div className={classes.backdrop} onClick={onEditItemCanceled} />
                            <div className={classes.editorEditContainer}>
                                <p className={classes.editorEditText}>Edit an Item</p>
                                <div className={classes.editorEditArea}>  
                                    <div className={classes.editorEditInput}>
                                        <div className={classes.editorItemInput}>Name: <input className={classes.editorEditName} type='text' placeholder={itemToBeEditted.name} onChange={(e) => {setItemToBeEditted((prev) => {return {...prev, name: e.target.value}})}} /></div>
                                        <div className={classes.editorItemInput2}>Description: <textarea className={classes.editorEditDescription} type='text' placeholder={itemToBeEditted.description} onChange={(e) => {setItemToBeEditted((prev) => {return {...prev, description: e.target.value}})}} /></div>
                                        <div className={classes.editorItemInput2}>Ingredients: <textarea className={classes.editorEditIngredients} type='text' placeholder={itemToBeEditted.ingredients} onChange={(e) => {setItemToBeEditted((prev) => {return {...prev, ingredients: e.target.value}})}} /></div>
                                        {/* <div className={classes.editorEditArea}>Price: <input className={classes.editorInput} type='text' placeholder={itemToBeEditted.price} onChange={(e) => {setItemToBeEditted((prev) => {return {...prev, price: e.target.value}})}} /></div>
                                        <div className={classes.editorEditArea}>Image: <input type='file' onChange={(e) => {setItemImage(e.target.files[0])}} /></div> */}
                                    </div>
                                    <div className={classes.editorEditButtons}>
                                        <div className={classes.editorItemInput}>Price: <input className={classes.editorEditPrice} type='text' placeholder={itemToBeEditted.price} onChange={(e) => {setItemToBeEditted((prev) => {return {...prev, price: e.target.value}})}} /></div>
                                        <div className={classes.editorItemInput}>Image: <input className={classes.editorEditImage} type='file' onChange={(e) => {setItemImage(e.target.files[0])}} /></div>
                                        <div className={classes.editorCheckBox}>
                                            <input type="checkbox" id="vege" checked={itemToBeEditted.vege} onClick={
                                                (e) => {setItemToBeEditted((prev) => {return {...prev, vege: e.target.checked}})}
                                                } />
                                            <label for="vege"> vegetarian</label>
                                        </div>
                                        <div className={classes.editorCheckBox}>
                                            <input type="checkbox" id="vegan" checked={itemToBeEditted.vegan} onClick={
                                                (e) => {setItemToBeEditted((prev) => {return {...prev, vegan: e.target.checked}})}
                                                } />
                                            <label for="vegan"> vegan</label>
                                        </div>
                                        <div className={classes.editorCheckBox}>
                                            <input type="checkbox" id="halal" checked={itemToBeEditted.halal} onClick={
                                                (e) => {setItemToBeEditted((prev) => {return {...prev, halal: e.target.checked}})}
                                                } />
                                            <label for="halal"> halal</label>
                                        </div>
                                        <div className={classes.editorCheckBox}>
                                            <input type="checkbox" id="featured" checked={itemToBeEditted.featured} onClick={
                                                (e) => {setItemToBeEditted((prev) => {return {...prev, featured: e.target.checked}})}
                                                } />
                                            <label for="featured"> featured</label>
                                        </div>
                                        <div className={classes.editorButtonArea}>
                                            <button className={classes.editorSaveButton} onClick={onEditItemConfirmed}>Save</button>
                                            <button className={classes.editorCancelButton} onClick={onEditItemCanceled}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <hr size="1" color="#6B2200" className={classes.line}></hr>
                    <div className={classes.currentCategoryArea}>
                    {
                        (currentCategory) ? (
                            <div>
                                {/* <p>currentCategory: {currentCategory.name} </p> */}
                                <div className={classes.itemContent}>
                                    <div className={classes.Itext}> Items</div>
                                    <div className={classes.itemArea}>
                                        {
                                            props.restaurant.categories.items.filter((category) => {
                                                return category.id === currentCategory.id
                                            }).map((category, index) => {
                                                return category.items.items.map((item, index) => {
                                                    if (!(item.hidden)) {
                                                        return (
                                                            <div className={classes.itemlist} key={item.id ? item.id : index}>
                                                                <div className={classes.itemDescription}>
                                                                    <div  className={classes.itemImage1}>
                                                                        <img className={classes.itemImage} src={item.image}></img>
                                                                    </div>
                                                                    <div className={classes.itemName1}>
                                                                        <p className={classes.itemName}>{item.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className={classes.itemButtons}>
                                                                    <button className={classes.itemButton} onClick={() => onDeleteButtonClicked(item)}><img className={classes.buttonImage} src={image}/></button>
                                                                    <button className={classes.itemButton} onClick={() => onEditItemButtonClicked(item)}><img className={classes.buttonImage} src={image2}/></button>
                                                                    <button className={classes.itemButton} onClick={async() => await onHideButtonClicked(item)}><img className={classes.buttonImage} src={image3}/></button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }) 
                                            })
                                        }
                                    </div>
                                    <div className={classes.itemArea}>
                                        {
                                            props.restaurant.categories.items.filter((category) => {
                                                return category.id === currentCategory.id
                                            }).map((category, index) => {
                                                return category.items.items.map((item, index) => {
                                                    if (item.hidden) {
                                                        return (
                                                            <div className={classes.itemlist} key={item.id ? item.id : index}>
                                                                <div className={classes.itemDescription}>
                                                                    <div  className={classes.itemImage1}>
                                                                        <img className={classes.itemImage} src={item.image}></img>
                                                                    </div>
                                                                    <div className={classes.itemName1}>
                                                                        <p className={classes.itemName}>{item.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className={classes.itemButtons}>
                                                                    <button className={classes.itemButton} onClick={() => onDeleteButtonClicked(item)}><img className={classes.buttonImage} src={image}/></button>
                                                                    <button className={classes.itemButton} onClick={() => onEditItemButtonClicked(item)}><img className={classes.buttonImage} src={image2}/></button>
                                                                    <button onClick={async() => await onRevealButtonClicked(item)}>reveal</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                }) 
                                            })
                                        }
                                    </div>
                                    {itemAdderOpened && (
                                        <div>
                                            <div className={classes.backdrop} onClick={onAddItemCancel} />
                                            <div className={classes.editorEditContainer}>
                                                <p className={classes.editorEditText}> Add a new Item </p>
                                                <div className={classes.editorEditArea}>  
                                                    <div className={classes.editorEditInput}>
                                                        <div className={classes.editorItemInput}>Name: <input className={classes.editorEditName} type='text' onChange={(e) => {setItemName(e.target.value)}} /></div>
                                                        <div className={classes.editorItemInput2}>Description: <textarea className={classes.editorEditDescription} type='text' onChange={(e) => {setItemDescription(e.target.value)}} /></div>
                                                        <div className={classes.editorItemInput2}>Ingredients: <textarea className={classes.editorEditIngredients} type='text' onChange={(e) => {setItemIngredients(e.target.value)}} /></div>
                                                    </div>
                                                    <div className={classes.editorEditButtons}>
                                                        <div className={classes.editorItemInput}>price: $<input className={classes.editorEditPrice} type='text' onChange={(e) => {setItemPrice(e.target.value)}} /></div>
                                                        <div className={classes.editorItemInput}>Image: <input className={classes.editorEditImage} type='file' onChange={(e) => {setItemImage(e.target.files[0])}} /></div>
                                                        <div className={classes.editorCheckBox}>
                                                            <input type="checkbox" id="vege" onClick={
                                                                (e) => {setItemSpecilities((prev) => {return {...prev, vege: e.target.checked}})}
                                                                } />
                                                            <label for="vege">vegetarian</label>
                                                        </div>
                                                        <div className={classes.editorCheckBox}>
                                                            <input type="checkbox" id="vegan" onClick={
                                                                (e) => {setItemSpecilities((prev) => {return {...prev, vegan: e.target.checked}})}
                                                                } />
                                                            <label for="vegan">vegan</label>
                                                        </div>
                                                        <div className={classes.editorCheckBox}>
                                                            <input type="checkbox" id="halal" onClick={
                                                                (e) => {setItemSpecilities((prev) => {return {...prev, halal: e.target.checked}})}
                                                                } />
                                                            <label for="halal">halal</label>
                                                        </div>
                                                        <div className={classes.editorCheckBox}>
                                                            <input type="checkbox" id="featured" onClick={
                                                                (e) => {setItemSpecilities((prev) => {return {...prev, featured: e.target.checked}})}
                                                                } />
                                                            <label for="featured">featured</label>
                                                        </div>
                                                        <div className={classes.editorButtonArea}>
                                                            <button className={classes.editorSaveButton} onClick={onAddItemConfirm}>Save</button>
                                                            <button className={classes.editorCancelButton} onClick={onAddItemCancel}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <button className={classes.addButton} onClick={AddMenuHandler}>+ Add</button>
                                </div>
                            </div>
                        ) : (
                            <p className={classes.defaltText}>choose category</p>
                        )
                    }
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default EditMenu;