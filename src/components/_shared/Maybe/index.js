import PropTypes from 'prop-types'

const Maybe = ({ value, children }) => {
  const valueNullOrUndefined = value === null || typeof value === 'undefined';

  return (
    <>
      {valueNullOrUndefined ? (<></>) : (<>{children}</>)}
    </>
  )
}

Maybe.propTypes = {
  value: PropTypes.any.isRequired,
}

export default Maybe;
