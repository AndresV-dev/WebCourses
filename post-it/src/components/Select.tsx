interface SelectProps {
    id: string,
    name: string,
    className?: string,
    defaultValue: string,
    options: any[],
    onChange: (e: any) => void
}

export default function Select(props: SelectProps){
    return(
        <select name={props.name} defaultValue={props.defaultValue} id={props.id} onChange={props.onChange} className={`comboOptions ${props.className || ""}`}>
            <option value="option" hidden>------ Select an Option ------</option>
              {
                props.options.length != undefined ? props.options.map((value: any, i: number) => {
                  return <option key={i} value={value.id}>{value.name}</option>
                }) : <></>
              }
            </select>
    )
}