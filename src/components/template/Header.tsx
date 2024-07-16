import { Avatar } from './Avatar'
import { Title } from './Title'

type HeaderProps = {
  title: string
  subTitle: string
}

export function Header(props: HeaderProps) {
  return (
    <div className="flex">
      <Title title={props.title} subTitle={props.subTitle} />
      <div className="flex flex-grow justify-end items-center">
        <Avatar />
      </div>
    </div>
  )
}
