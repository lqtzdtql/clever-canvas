import { useEffect, useRef, useState } from 'react';
import Radar from './Radar';

const arcConfigList = [
  {
    r: 1000,
    strokeColor: 'white',
    lineWidth: 8
  },
  {
    r: 500,
    strokeColor: 'white',
    lineWidth: 8
  },
  {
    r: 100,
    strokeColor: 'white',
    lineWidth: 8
  }
]

function App() {
  const parent = useRef(null);
  const [width, setWidth] = useState(1);
  const [ellipseConfigList, setEllipseConfigList] = useState([]);
  const temp = useRef(null);

  const resizeChange = () => {
    setWidth(parent.current.offsetWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', resizeChange);
    resizeChange();
    if (temp.current) clearInterval(temp.current);
    temp.current = setInterval(() => {
      let tempList = [];
      for (let i = 0;i < 5;i++) {
        const r = Math.random() * 950;
        const angle = Math.random() * 360;
        tempList.push({
          size: {a: 160, b: 80},
          position: {r, angle},
          fillColor: '#76d432',
          onClick: () => {console.log(`点击元素为${Math.floor(r)}`)},
          textConfigList: [
            {
              text: Math.floor(r),
              position: {r, angle},
              font: '100px Microsoft YaHei',
              fillColor: 'black',
              textBaseline: 'middle',
              // maxWidth: 100
            }
          ]
        })
        setEllipseConfigList(tempList);
      }
    }, 1000)
    return () => window.removeEventListener('resize', resizeChange);
  }, [])


  return (
    <div ref={parent} style={{width: '30vw', backgroundColor: 'black'}}>
      <Radar
        size = {{width}}
        direction = 'center'
        canvasPadding = {{
          paddingTop: 20,
          paddingLeft: 20,
          paddingBottom: 20,
          paddingRight: 20
        }}
        arcConfigList = {arcConfigList}
        ellipseConfigList = {ellipseConfigList}
      />
    </div>
  );
}

export default App;
