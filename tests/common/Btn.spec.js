import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Btn from '../../client/components/common/Btn'

describe('<Btn />', () => {
  it('should click when triggered', () => {
    const handleButtonClick = sinon.spy()
    const wrapper = mount(<Btn onClick={handleButtonClick} />)

    wrapper.find('button').simulate('click', { preventDefault: () => {} })
    expect(handleButtonClick.calledOnce).to.equal(true)
  })
})
