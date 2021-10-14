import React, { useState, useEffect }　from 'react';
import axios from 'axios';
import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import PostFrom from '../components/PostForm';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Home() {
    const classes = useStyles();
    const [posts,setPosts] = useState([]);
    const [formData,setFormData] = useState({name:'',content:''});

    useEffect(() => {
      getPostData();
    },[])

    const getPostData = () => {
      axios
        .get('/api/posts')
        .then(response => {
            setPosts(response.data); 
            console.log(response.data);　
        })
        .catch((error) => {
            console.log('通信に失敗しました');
            console.log(error);
        });
    }

    const inputChange = (e) => {
      const key = e.target.name;
      const value = e.target.value;
      formData[key] = value;
      let data = Object.assign({}, formData);
      setFormData(data);
  }

  const createPost = async() => {
    //空だと弾く
    if(formData == ''){
        return;
    }
    //入力値を投げる
    await axios
        .post('/api/post/create', {
            name: formData.name,
            content: formData.content
        })
        .then((res) => {
            //戻り値をtodosにセット
            const tempPosts = posts
            tempPosts.push(res.data);
            setPosts(tempPosts)
            setFormData('');
        })
        .catch(error => {
            console.log(error);
        });
}


    let rows = [];
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>タスク管理</h1>
                        <Card className={classes.card}>
                          <PostFrom data={formData} btnFunc={createPost} inputChange={inputChange} />
                        </Card>
                        <Card className={classes.card}>
                          <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
