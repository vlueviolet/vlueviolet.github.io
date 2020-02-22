let arrayIndex = 0;
let style = '';
const fnCompanyTemplate = ({company}) => {
    arrayIndex++;
    return `<li class="${arrayIndex === 1 ? 'is_active' : ''}"><a href="#">${company}</a></li>`
}

export {fnCompanyTemplate}