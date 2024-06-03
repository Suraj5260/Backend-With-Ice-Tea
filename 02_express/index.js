import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let teaData = []
let newtId = 1

// Add a tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: newtId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all teas
app.get("/teas", (req, res) => {
    res.status(200).send(teaData)
})

// get a specific tea
app.get("/teas/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send("tea Not found")
    } else {
        res.status(200).send(tea)
    }

})

// update tea data
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// Delete tea

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send("tea Not found")
    }
    teaData.splice(index, 1)
    res.status(200).send("tea deleted")

})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
})