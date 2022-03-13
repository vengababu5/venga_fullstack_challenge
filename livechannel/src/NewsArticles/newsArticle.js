import {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import './newsArticle.css';

const NewsArticles = () => {
    const [articles, setArticles] = useState([]);
    const [articleFilter, setArticalFilter] = useState('');
    const [showRecords, setShowRecords]=useState(true);

    //fetch article data
    const fetchArticlesData = () => {
        axios.get('http://localhost:3002/getnews')
        .then(items => {
            if(items?.data.length >0){
                setArticles(items?.data);
            } else {
                setArticles([]);
                setShowRecords(false);
            }
        }).catch(err=>{
            setShowRecords(false);
        });
    }

    //filter article data
    const filterArticlesData = (query) => {
        axios.get(`http://localhost:3002/filterarticle?q=${query}`).then(value => {
        console.log(value.data); 
            if (value?.data.length > 0) {
                let data = value.data.map(article => {
                    return { ...article, name: article.author };
                })
                setArticles(data);
            } else {
                setArticles([]);
                setShowRecords(false);
            }  
        }).catch(err => {
            setShowRecords(false);
        });
    }

    //filter submit handler
    const filterArticles = () =>{
        if (articleFilter !==''){
            filterArticlesData(articleFilter);
            
        }
    }
    useEffect(() => {
        fetchArticlesData();
    }, [])
    return (
        <>
            {articles.length ===0 ?
                showRecords ? <Spinner  animation="border" size="lg" /> :'No records available'
            :
            <Container >
                <Row>
                    <Col md={6}>
                        <h2>Articles</h2>
                    </Col>
                    <Col md={6} className="mt-2">
                            <input type="text" placeholder="Enter value to filter" onChange={(e) => setArticalFilter(e.target.value)}  value={articleFilter} /> 
                        <input type="button" value="Filter" onClick={filterArticles} />
                    </Col>
                </Row>               
                <Row className="mt-2">
                    {
                        articles.length > 0 &&
                        articles.map((article) => {
                            return(
                                <div className="article" key = {article.id}>
                                    <Card>
                                        <a href={article.url} target="_blank"><Card.Header>{article.name}</Card.Header>
                                        </a>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {article.description}
                                                </p>
                                            </blockquote>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }

                <div>
                    <h4>NewsArticles
    
                </h4>
                    {articles.length > 0 &&
                        articles.map(article => {
                            return (
                                <div>
                                    <a href={article.url} target="_blank">
                                        {article.name}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
                </Row>
            </Container>
            }
        </>
                
    )
}

export default NewsArticles;