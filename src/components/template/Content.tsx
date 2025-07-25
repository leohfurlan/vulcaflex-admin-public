type ContentProps = {
  children: React.ReactNode
}

export function Content(props: ContentProps) {
  return <div className="flex flex-col mt-7">{props.children}</div>
}
