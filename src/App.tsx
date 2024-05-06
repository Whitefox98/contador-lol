import React, { useCallback, useState } from 'react';

interface Item {
  name: string
  value: number
}
const goodThings : Item[]= [
  {
    name: 'Buen wardeo aliado',
    value: 1
  },
  {
    name: 'Buen wardeo enemigo',
    value: 3
  },
  {
    name: 'Trade equivalente',
    value: 2
  },
  {
    name: 'Trade favorable',
    value: 3
  },
  {
    name: 'Trade muy favorable',
    value: 5
  },
  {
    name: 'Kill',
    value: 1
  },
  {
    name: 'Kill bounty',
    value: 2
  },
  {
    name: 'Torre',
    value: 3
  },
  {
    name: 'Torre con bounty',
    value: 5
  },
  {
    name: 'Roaming',
    value: 2
  },
  {
    name: 'Drake',
    value: 3
  },
  {
    name: 'Alma drake',
    value: 5
  },
  {
    name: 'Nash',
    value: 5
  },
  {
    name: 'Nexo',
    value: 10
  },
  {
    name: 'Objetivo individual',
    value: 3
  },
  {
    name: 'Plan preguntas',
    value: 10
  },
  {
    name: 'Extra',
    value: 2
  },
]
const badThings : Item[]= [
  {
    name: 'Trade favorable enemigo',
    value: -3
  },
  {
    name: 'Trade muy favorable enemigo',
    value: -5
  },
  {
    name: 'Kill enemiga',
    value: -1
  },
  {
    name: 'Kill bounty enemiga',
    value: -2
  },
  {
    name: 'Torre enemiga',
    value: -3
  },
  {
    name: 'Torre con bounty enemiga',
    value: -5
  },
  {
    name: 'Drake enemigo',
    value: -3
  },
  {
    name: 'Alma drake enemigo',
    value: -5
  },
  {
    name: 'Nash enemigo',
    value: -5
  },
  {
    name: 'Nexo enemigo',
    value: -10
  },
]
function App() {
  const [values, setValues] = useState<Item[]>([])
  const addValue = useCallback((value: Item) => {
    setValues((old) => [...old, value])
  }, [])
  const removeValue = useCallback((pos: number) => {
    setValues((old) => {
      const copy = JSON.parse(JSON.stringify(old))
      copy.splice(pos, 1)
      return copy
    })
  }, [])
  return (
    <div className="App">
      <Selector items={goodThings} onClick={addValue} label={'Cosas buenas'} />
      <Selector items={badThings} onClick={addValue} label={'Cosas malas'} />
      <TableScore values={values} removeValue={removeValue}/>
    </div>
  );
}

interface SelectorInterface {
  label: string
  items: Item[]
  onClick: (item: Item) => void
}
const Selector: React.FC<SelectorInterface> = ({ items, onClick , label}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={toggleSelector} style={{ cursor: 'pointer' }}>
        {label}
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#fff',
            boxShadow: '0 0 5px rgba(0,0,0,0.3)',
            padding: '10px',
            zIndex: 999,
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          {filteredItems.map((item, index) => (
            <div key={index} onClick={() => { setIsOpen(false); setSearchTerm(''); onClick(item) }}>{item.name}  {item.value}</div>
          ))}
        </div>
      )}
    </div>
  );
};

interface TableScoreProps {
  values: Item[]
  removeValue: (pos: number) => void
}

const TableScore: React.FC<TableScoreProps> = ({ values, removeValue }) => {
  const renderThis: JSX.Element[] = []
  let score = 0
  for (const key in values) {
    const element = values[key]
    score = score + element.value
    if (score < 0) {
      score = 0
    }
    renderThis.push(
      <div style={{ display: 'flex', alignItems: 'center', background: element.value < 0 ? '#AD6A6C' : '#87A878' }} key={key+element.value}>
        <div style={{width: '400px'}}>{element.name}</div>
        <div style={{width: '400px'}}>{element.value}</div>
        <div style={{width: '400px'}}>{score}</div>
        <div style={{ width: '100px' }} onClick={() => removeValue(parseInt(key))}>Eliminar</div>
      </div>
    )
  }
  return (
    <div>
      {renderThis}
    </div>
  )
}


export default App;
