import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import style from './SearchBar.module.css';
import icon_search from './../../assets/icon/search.png';

type FormSearch = {
  txtSearch: string
}

const SearchBar = () => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormSearch>();

  const onSubmit = (data: FormSearch) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_group}>
        <img src={icon_search} alt="icon_search" className={style.form_controls_prefix} />
        <input
          {...register("txtSearch", { required: true })}
          type="text"
          name="txtSearch"
          className={style.form_input}
          placeholder="Search"
        />
        {/* {
          errors.txtSearch && <div className={style.form_error}>Please input text</div>
        } */}
      </div>
    </form >
  )
}

export default SearchBar;


