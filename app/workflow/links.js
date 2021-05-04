
const Link = (links) => {
    const getNextActionName = (currentAction, execData) => {

        if(links.hasOwnProperty(currentAction.getName())){
            if(currentAction.getTypeName() === "condition"){
                if(!!execData.getActionResult(currentAction.getName())){
                    return links[currentAction.getName()].next_t
                } else{
                    return links[currentAction.getName()].next_f
                }
            }else {
                return links[currentAction.getName()].next
            }
        }
        else{
            throw "Action not present in links"
        }
    }

    return {getNextActionName}
}

module.exports = Link