import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineChevronDown } from "react-icons/hi";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

type PaginationType = {
  data: any,
  fetchRuas: (val1: any, val2: any) => void,
  setPerPage: (val: number) => void,
}

export default function Pagination(props: PaginationType) {
  
  return (
    < div className="flex items-center justify-between border-t border-gray-200 bg-white py-3" >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href={props.data.prev_page_url}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href={props.data.next_page_url}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{props?.data?.from}</span> to <span className="font-medium">{props?.data?.to}</span> of{' '}
            <span className="font-medium">{props?.data?.total}</span> results
          </p>
        </div>
        <div className='flex gap-5'>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Show: {props.data.per_page} entries
                <HiOutlineChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => {
                          props.setPerPage(5)
                          props.fetchRuas(5, 1)
                        }}
                        className={classNames(
                          props.data.per_page === 5 ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        5 entries
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => {
                          props.setPerPage(10)
                          props.fetchRuas(10, 1)
                        }}
                        className={classNames(
                          props.data.per_page === 10 ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        10 entries
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => {
                          props.setPerPage(50)
                          props.fetchRuas(50, 1)
                        }}
                        className={classNames(
                          props.data.per_page === 50 ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        50 entries
                      </button>
                    )}
                  </Menu.Item>   
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => {
                          props.setPerPage(100)
                          props.fetchRuas(100, 1)
                        }}
                        className={classNames(
                          props.data.per_page === 100 ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left'
                        )}
                      >
                        100 entries
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              disabled={props?.data?.from === 1}
              onClick={() => props.fetchRuas(props?.data?.per_page, props?.data?.current_page - 1)}
              className={`${props?.data?.from === 1 ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <HiOutlineChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {props?.data?.current_page}
            </a>

            <button
              disabled={props?.data?.next_page_url === null}
              onClick={() => props.fetchRuas(props?.data?.per_page, props?.data?.current_page + 1)}
              className={`${props?.data?.next_page_url === null ? "cursor-not-allowed bg-gray-300" : "cursor-pointer"} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <HiOutlineChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div >
  )
}
