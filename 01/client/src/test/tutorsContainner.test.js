import {React} from 'react'
import history from '../utils/history'
import '@testing-library/react'
import {render} from '@testing-library/react'
import  { TutorsContainer } from '../components/TutorsContainer'
import { CategoriesBar } from '../components/CategoriesBar'
import {CardContainer} from '../components/CardContainer'


describe('Check TurorsContainer component', () =>{

  beforeAll(() => {
    history.push('/')
  })

    test ('Render content', () => {
    const subtitle = 'subtitle'
    const tutorsContainer = render(<TutorsContainer subtitle={subtitle}/>)
    tutorsContainer.getByText('subtitle')
  })

  test('Show categories',() => {
    const Categories = [{subject:'Math'},{subject:'Development'},{subject:'Art'}]
    const categoriesBar =  render(<CategoriesBar Categories={Categories} setFilter={'Math'} />)
    categoriesBar.getByText('Math')
  })

  test('Show all Categories',() => {
    const Categories = [{subject:'Math'},{subject:'Development'},{subject:'Art'}]
    const categoriesBar = render(<CategoriesBar Categories={Categories} />)
    const buttons = categoriesBar.container.querySelectorAll('button')
    expect(buttons.length).toBe(Categories.length) 
  })

  test('Render cards', () => {
  const tutors= [{
    id:'id', 
    name:'name',
    profile_photo: 'photo',
    description: 'description',
    profession: '',
    focus:'focus',
      rating: 3}]
  const cardContainer = render(<CardContainer Tutors={tutors}/>)
  cardContainer.getByText('name')
  })
})
