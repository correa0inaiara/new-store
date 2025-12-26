'use client'

import { useRef, useState } from "react";
import { getProducts } from "../lib/prisma-db";
import ListProducts from "./list-products";


export const Search = () => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [input, setInput] = useState('')
    const [products, setProducts] = useState([])

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    async function handleOnChange(event: any) {
        let value = event.target.value
        value = value.trim().toLowerCase()
        setInput(value)

        if (!value || value === '')
            return

        searchKeywords(value)
    }

    async function searchKeywords(value:any) {
        const res = await fetch(`/api/products?q=${value}`);
        const products = await res.json();
        if (products || products.length > 0) setProducts(products)
        else setProducts([])
    }

    function limparPesquisa() {
        setInput('')
        setProducts([])
    }

    return (
        <>
            <button className="m-2.5" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
            </button>

            <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {/* <h3 className="font-bold text-lg">Search</h3> */}

                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            value={input}
                            onChange={(e) => handleOnChange(e)}
                            type="search"
                            placeholder="Search" />
                    </label>

                    <ListProducts products={products} />

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button 
                                className="btn"
                                onClick={limparPesquisa}
                            >Limpar Pesquisa</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}