import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import style from './CreateCourse.module.css';

type FormCreateCourse = {
  description: string;
  fileVideo: any;
};

const CreateCrourse = () => {
  const [files, setFiles] = useState<any>([]);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormCreateCourse>();

  const onFileUpload = (event: any) => {
    event.preventDefault();
    const id = event.target.id;
    const fileReader = new FileReader();
    const file = event.target.files[0];
    fileReader.onload = () => {
      setFiles([...files, { file_id: id, uploaded_file: fileReader.result }]);
    };
    fileReader.readAsDataURL(file);
  };

  const onSubmit = (data: FormCreateCourse) => {
    console.log(data);
    console.log(files);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.form_group}>
        <label className={style.form_label}>Upload File Video</label>
        <div className={style.form_upload}>
          <input

            {...register('fileVideo', { required: true })}
            name="fileVideo"
            onChange={onFileUpload}
            id={'1'}
            accept=".jpeg, .pdf,"
            multiple
            type="file"
          />
        </div>
      </div>
      <div className={style.form_group}>
        <label className={style.form_label}>Description</label>
        <textarea
          {...register('description', { required: true })}
          name="description"
          className={style.form_input}
          placeholder="Description"
        />
        {errors.description && <div className={style.form_error}>Please input text</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCrourse;
