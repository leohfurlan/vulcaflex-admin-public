import { ChartIcon, HomeIcon, InfoIcon, LogoutIcon } from '@/components/icons'
import { MenuItem } from './MenuItem'
import { Logo } from './Logo'

export function SideMenu() {
  return (
    <aside className="flex flex-col text-gray-700 bg-gray-200">
      <div className="h-20 w-20 flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-700">
        <Logo />
      </div>
      <ul className="flex-grow">
        <MenuItem url="/" text="Home" icon={HomeIcon} />
        <MenuItem url="/history" text="Histórico" icon={ChartIcon} />
        <MenuItem url="/status" text="Status" icon={InfoIcon} />
      </ul>
      <ul>
        <MenuItem
          text="Sair"
          icon={LogoutIcon}
          onClick={() => console.log('Logout!')}
          className="text-red-600 hover:bg-red-500 hover:text-white"
        />
      </ul>
    </aside>
  )
}
