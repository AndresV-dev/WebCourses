interface SelectProps {
    id: string,
    name: string,
    defaultValue: string,
    options: any[],
    onChange: (e: any) => void
}

export default function Select(props: SelectProps){
  console.log(props.options)
    return(
        <select name={props.name} defaultValue={props.defaultValue} id={props.id} onChange={props.onChange}>
            <option value="option" hidden>------ Select an Option ------</option>
              {
                props.options.map((value: any, i: number) => {
                  return <option key={i} value={value.id as number}>{value.name}</option>
                })
              }
            </select>
    )
}