import React, {useEffect,useState} from 'react';
import './ListColors.css'

function ListColors() {

    const [colors, setColors] = useState([])
    const [page, setPage] = useState(1);
    const [fetchColors, setFetchColors] = useState(false);

    useEffect(() => {
      loadData()
      window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
    }, [])

    useEffect(() => {
        if (fetchColors){
        loadData();
        }
      }, [fetchColors]);

    const loadData = async () => {

        const resp = await fetch(`https://reqres.in/api/unknown?per_page=2&page=${page}`)
        const data = await resp.json()
        console.log("data ",data?.data)
        console.log("colors ",colors)
        setColors([...colors,...data?.data])
        setPage(page+1)
        setFetchColors(false)
    }

    const isScrolling =()=>{
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){
          return;
        }
        setFetchColors(true)
      }

    return (
        
        <div>
            {colors && colors.map(color => {
                return <ul className="colorList">
                    <li className="colorName">{color.name}</li>
                    <li className="colorDisplay">{color.color}</li>
                </ul>
            })}
        </div>
    )
}

export default ListColors
