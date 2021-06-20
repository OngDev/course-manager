import * as React from "react";
import { useNotify, useRefresh, useRedirect, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, ImageInput, ImageField } from 'react-admin';

export const CourseList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="title" />
            <TextField source="description"/>
            <ImageField source="thumbnailUrl" label="Thumbnail" />
            <EditButton basePath="/courses" />
        </Datagrid>
    </List>
);

const CourseTitle = ({ record }) => {
    return <span>Course {record ? `"${record.title}"` : ''}</span>;
};

export const CourseEdit = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify(`Changes saved`)
        redirect('/courses');
        refresh();
    };
    return (
        <Edit title={<CourseTitle />} onSuccess={onSuccess} {...props} mutationMode="optimistic">
            <SimpleForm >
                <TextInput source="title" />
                <TextInput source="description" options={{ multiline: true }} />
                <ImageField source="thumbnailUrl" label="Current Thumbnail" />
                <ImageInput source="thumbnail" label="New Thumbnail" accept="image/*">
                    <ImageField source="src" title="title"/>
                </ImageInput>
            </SimpleForm>
        </Edit>
    );
};

export const CourseCreate = (props) => (
    <Create title="Create a Course" {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" options={{ multiline: true }} />
            <ImageInput source="thumbnail" label="Thumbnail" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);