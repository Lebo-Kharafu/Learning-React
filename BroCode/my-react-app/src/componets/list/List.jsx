import Student from "../student/Student.jsx";
import './List.css'


function List() {

    const students = [
        {
            id: 1,
            name: "Joe Doe",
            details: "Loves coding and playing guitar.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 2,
            name: "Kan James",
            details: "Enjoys basketball and science fiction.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 3,
            name: "Lisa Ray",
            details: "Aspiring data scientist and foodie.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 4,
            name: "Carlos Smith",
            details: "Speaks 3 languages and loves hiking.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 5,
            name: "Aisha Khan",
            details: "Passionate about AI and robotics.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 6,
            name: "Mike Taylor",
            details: "Web developer and part-time photographer.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 7,
            name: "Sara Lin",
            details: "Creative writer and cat lover.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 8,
            name: "Leo Zhang",
            details: "Enjoys gaming, anime, and coding.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 9,
            name: "Emily Clark",
            details: "Studying psychology and loves painting.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        },
        {
            id: 10,
            name: "Raj Patel",
            details: "Interested in startups and public speaking.",
            profilePic: "https://picsum.photos/id/" + Math.floor(Math.random() * 1000) + "/200"
        }
    ];


    const ListItems = students.map(stu => <li key={stu.id}>
        <Student profilePic={stu.profilePic} name={stu.name} details={stu.details} />
                                        </li>);

    return (
        <ul className="student-list">
            {ListItems}
        </ul>
    );
}

export default List