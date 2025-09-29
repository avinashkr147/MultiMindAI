import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationsItem'
import axios from 'axios'
import toast from 'react-hot-toast'



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
// const dummyCreationData = [
//     {
//         "id": 9,
//         "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
//         "prompt": "Generate a blog title for the keyword blog in the category Technology.",
//         "content": "Here are a few blog title options for a technology blog, playing with different angles:\n\n**General & Broad:**\n\n*   The Tech Blog: News, Reviews, and Insights\n*   Technology Today: Your Daily Dose of Tech\n*   The Future is Now: Exploring the World of Technology\n*   Tech Talk: Unpacking the Latest Innovations\n\n**More Specific & Intriguing:**\n\n*   Decoding Tech: Making Sense of the Digital World\n*   Beyond the Gadgets: The",
//         "type": "blog-title",
//         "publish": false,
//         "likes": [],
//         "created_at": "2025-07-01T11:09:50.492Z",
//         "updated_at": "2025-07-01T11:09:50.492Z"
//     },
//     {
//         "id": 8,
//         "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
//         "prompt": "Generate a blog title for the keyword blog in the category General.",
//         "content": "Here are a few blog title options for a blog about blogs in the General category, ranging from straightforward to a bit more creative:\n\n**Straightforward:**\n\n*   The Blog Blog: Everything You Need to Know About Blogging\n*   Blogging Insights: Tips, Tricks, and Trends\n*   Your Guide to the World of Blogging\n\n**More Creative:**\n\n*   Beyond the Post: Exploring the Art of Blogging\n*   Blogosphere Unlocked: Navigating the World of Online Writing",
//         "type": "blog-title",
//         "publish": false,
//         "likes": [],
//         "created_at": "2025-07-01T11:08:10.450Z",
//         "updated_at": "2025-07-01T11:08:10.450Z"
//     },
//     {
//         "id": 7,
//         "user_id": "user_2yMX02PRbyMtQK6PebpjnxvRNIA",
//         "prompt": "Write an article about AI With Coding in Short (500-800 word).",
//         "content": "## AI and Coding: A Symbiotic Partnership Reshaping the Future\n\nArtificial intelligence (AI) and coding, once distinct disciplines, are now deeply intertwined, forging a powerful symbiotic relationship that's revolutionizing industries and accelerating innovation. Understanding this connection is crucial for anyone seeking to navigate the future of technology.\n\nAt its core, AI is the ability of a machine to mimic intelligent human behavior. This is achieved through algorithms, which are essentially sets of instructions meticulously crafted by programmers – coders. Coding, therefore, is the backbone of AI, providing the language and structure necessary to bring these algorithms to life.\n\n**Coding Fuels AI: Building the Foundation**\n\nAI models don't magically appear. They are built, trained, and deployed using code. Here's how:\n\n*   **Data Preprocessing:** Raw data, the lifeblood of AI, is often messy and unusable in its original form. Coders use programming languages like Python with libraries like Pandas and NumPy to clean, transform, and prepare this data for training. This involves handling missing values, removing inconsistencies, and formatting data into a suitable structure.\n*   **Model Development:** Coders utilize programming languages like Python and R, coupled with machine learning libraries like TensorFlow, PyTorch, and scikit-learn, to build and train AI models. These libraries provide pre-built functionalities and tools that simplify the process of creating complex algorithms.\n*   **Deployment and Integration:** Once trained, AI models need to be deployed and integrated into real-world applications. This involves writing code to connect the model to existing systems, handle user input, and present the results in a user-friendly manner.\n*   **Maintenance and Optimization:** AI models are not static entities. They require constant monitoring, maintenance, and optimization to ensure they remain accurate and effective. Coders play a vital role in identifying and addressing performance issues, retraining models with new data, and adapting them to changing requirements.\n\n**AI Empowers Coding: Revolutionizing Development**\n\nThe relationship isn't just one-way. AI is also transforming the way coding is done, making developers more efficient and productive.\n\n*   **Code Completion and Suggestion:** AI-powered tools like GitHub Copilot and Tabnine analyze code context and suggest code snippets, reducing repetitive tasks and accelerating development. These tools learn from vast code repositories and can predict what a developer is likely to write next, saving significant time and effort.\n*   **Automated Testing and Debugging:** AI can automate the process of testing code and identifying bugs. By analyzing code patterns and identifying potential vulnerabilities, AI tools can help developers catch errors early and improve code quality.\n*   **Code Generation:** AI is increasingly capable of generating code from natural language descriptions. This allows developers to focus on the higher-level aspects of software design and leave the more tedious coding tasks to AI.\n*   **Personalized Learning:** AI can personalize the learning experience for aspiring coders by tailoring educational content and providing individualized feedback. This can make learning to code more effective and engaging.\n\n**The Future: Collaboration and Specialization**\n\nThe future of AI and coding is one of increasing collaboration and specialization. As AI becomes more sophisticated, coders will need to focus on higher-level tasks such as designing AI architectures, managing data pipelines, and ensuring ethical considerations are addressed.\n\nThe demand for skilled professionals who understand both AI and coding is rapidly growing. Individuals with this skillset are well-positioned to lead the charge in developing innovative AI-powered solutions across a wide range of industries.\n\n**In conclusion,** AI and coding are not separate entities but rather two sides of the same coin. Coding provides the foundation for AI, while AI empowers coding, leading to a more efficient and innovative development process. Understanding this symbiotic relationship is essential for anyone seeking to thrive in the rapidly evolving landscape of technology. As AI continues to advance, the demand for skilled professionals who can bridge",
//         "type": "article",
//         "publish": false,
//         "likes": [],
//         "created_at": "2025-07-01T11:07:51.312Z",
//         "updated_at": "2025-07-01T11:07:51.312Z"
//     }
// ]

function Dashboard() {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

 const getDashboardData = async ()=>{
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers : {Authorization: `Bearer ${await getToken()}`}
      })

      if (data.success) {
        setCreations(data.creations)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(()=>{
    getDashboardData()
  }, [])

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>
        {/* Total Creations Card  */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Total Creations</p>
              <h2 className='text-xl font-semibold'>{creations.length}</h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
              <Sparkles className='w-5 text-white' />
            </div>
        </div>

        {/* Active Plan Card  */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200'>
            <div className='text-slate-600'>
              <p className='text-sm'>Active Plan</p>
              <h2 className='text-xl font-semibold'>
                <Protect plan='premium' fallback="Free">Premium</Protect>
              </h2>
            </div>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
              <Gem className='w-5 text-white' />
            </div>
        </div>

      </div>

    {
      loading ? 
      (
        <div className='flex justify-center items-center h-3/4'>
          <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
        </div>
      )
      :
      (
        <div className='space-y-3'>
          <p className='mt-6 mb-4'>Recent Creations</p>
          {
            creations.map((item)=> <CreationItem key={item.id} item={item}/>)
          }
        </div>
      )
    }
    

    </div>
  )
}

export default Dashboard