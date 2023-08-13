import { fetchData } from '../api/api';
import { React, useState, useEffect } from 'react';

const List = ({ title, param }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetchData(param).then(res => setList(res.data.results))
    }, []);
    return (
        <div className="list">
            <div className="row">
                <h2 className="text-white title">{title}</h2>
                <div className="col">
                    <div className="row__posters">
                        {list.map(items => 
                            <img
                                className="row__poster row__posterLarge"
                                src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                                alt={items.title}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List