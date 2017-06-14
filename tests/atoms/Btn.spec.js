import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Btn from '../../client/atoms/Btn'

describe('<Btn />', () => {
  it('should click when triggered', () => {
    const handleButtonClick = sinon.spy()
    const wrapper = shallow(<Btn onClick={handleButtonClick} text='Click' />)

    wrapper.find('button').simulate('click', { preventDefault: () => {} })
    expect(handleButtonClick.calledOnce).to.equal(true)
  })
})
