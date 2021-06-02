import React from 'react';
import style from './Tables.module.css';

import 'antd/dist/antd.css';
import { Button, Table, Tag, } from 'antd';



const Tables = () => {
  const data = [
    {
      key: '1',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer'],
    },
    {
      key: '2',
      nameActor: 'Jim',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '3',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '4',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '5',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '6',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '7',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '8',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '9',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '10',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '11',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '12',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
    {
      key: '13',
      nameActor: 'Ong Dev',
      time: 90,
      datetime: '01/06/2021',
      titleVideo: 'Đập hộp Macbook Air M1 2020 và lí do Ông Dev mua Air | Vlog',
      tags: ['macbook', 'developer', 'Bia'],
    },
  ];
  const { Column } = Table;


  return (
    <div>
      <Table dataSource={data} className={style.table_layout}>
        <Column title="STT" dataIndex="key" key="key" />
        <Column title="Name Actor" dataIndex="nameActor" key="nameActor" />
        <Column title="Time (min)" dataIndex="time" key="time" />
        <Column title="Datetime" dataIndex="datetime" key="datetime" />
        <Column title="Title Video" dataIndex="titleVideo" key="titleVideo" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={tags => (
            <>
              {tags.map((tag: any) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text: any, record: any) => (
            <>
              <Button type="primary" size="small" >
                <a>Invite</a>
              </Button>
              <Button type="ghost" size="small">
                <a>Edit</a>
              </Button>
              <Button type="danger" size="small">
                <a>Delete</a>
              </Button>
            </>
          )}
        />
      </Table>
    </div>
  )
}

export default Tables;
