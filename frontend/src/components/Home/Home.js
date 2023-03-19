import React from 'react'
import ReactCardSlider from 'react-card-slider-component';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import "./Home.css"
import intro from "./Intro.png"

const slides = [
    {
        title: 'Build your Employees Schedule',
        description:
            'In this System you can create and edit your employees schedule in easy way and most comfort way',
        image: 'https://www.teamboard.cloud/wp-content/uploads/2022/09/schedule-conflicts.webp',

    },
    {
        title: 'No Need for Papers!',
        description:
            'In our System you Dont need a pen or paper every thing electronic and in one click',
        image: 'https://cgu-odisha.ac.in/wp-content/uploads/2021/04/electronic-engineering-1.jpg',

    },
    {
        title: 'A Hole HR Department in our system !',
        description:
            'You can deal with the employee data in out site',
        image: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/What_Is_MBA_In_HR_And_The_Use_Of_An_MBA_In_HR.jpg',

    },
    {
        title: 'Auto calculate the annual and sick leaves in our system',
        description:
            'you can show for the employee their annual and sick leave without check by yourself',
        image: 'https://www.datocms-assets.com/40521/1614234739-1.png',

    },
    {
        title: 'Salary data for every employee',
        description:
            'By one click and one input you will put the hourly salary for every employee',
        image: 'https://thehubbackend.com/media/41372-Depositphotos_55140233_s-2019.jpg',

    },
    {
        title: 'Electronic fingerpring system',
        description:
            'you can in our system check in daily basis for every employee when his schedule begin and end',
        image: 'https://helen.edu.vn/wp-content/uploads/2021/09/smart-attendance-management-systemt-2-1024x576.jpeg',

    },
]

const testimonials = 
    [{
        title: 'John Doe',
      
      description:
        'CEO',
      image:
        'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        title: 'Jane Doe',
      
      description:
        'Web Designer.',
        image:
        'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        title: 'Bob Smith',
    
        description:
        'Deveolper.',
      image:
        'https://randomuser.me/api/portraits/men/3.jpg',
    },]
  

const Home = () => {

    return (
        <div className='homeContainer'>
            <div className='intro'>
                <p className='introParagraph'>The Best System Site to Moderate your Company !</p>
                <img className='introImage' src={intro} />
            </div>
            <div className='a2nd'>

                <div className='sliderContainer'>

                    <Slider autoplay={3000}>
                        {slides.map((item, index) => (
                            <div
                                key={index}

                                style={{
                                    backgroundImage: `linear-gradient(rgba(17, 5, 5, 0.8), rgba(1, 1, 23, 0.3)), url(${item.image})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <div className="center">
                                    <h1 style={{ color: 'white', fontWeight: 'bold' }}>{item.title}</h1>
                                    <p style={{ color: 'white', fontWeight: 'bold' }}>{item.description}</p>

                                </div>
                            </div>
                        ))}
                    </Slider>


                </div>
            </div>
            <div className="testimonials">
    <h2 className="testimonialsTitle">Our employees</h2>
   
     
        
    <ReactCardSlider slides={testimonials}/>

    </div>
  </div>
        
    )
}

export default Home