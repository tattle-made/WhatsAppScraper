import React from "react"
// import PropTypes from "prop-types"
import Checkbox from "../CheckBox/CheckBox"
import * as S from "./style"

const intlOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
}

const Message = ({
  media,
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
  onselect,
  selected,
  tags,
  author,
}) => {
  const isSystem = message.author === "System"

  const msgdate = new Date(message.date)

  const dateTime = msgdate.toISOString().slice(0, 19).replace("T", " ")
  // const dateTime = ""

  const handleCheck = event => {
    onselect(message.id, event.currentTarget.checked)
  }

  return (
    <S.Item
      isSystem={isSystem}
      isActiveUser={isActiveUser}
      sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble isSystem={isSystem} isActiveUser={isActiveUser}>
        <S.Wrapper>
          <S.MessageTop>
            <Checkbox
              checked={selected}
              defaultChecked={false}
              onChange={handleCheck}
            />
            <S.Author color={color}>{author}</S.Author>
          </S.MessageTop>
          {media ? <img src={media.src} alt="img" width="200px" /> : null}
          <S.Message>{message.content}</S.Message>
        </S.Wrapper>
        {!isSystem && (
          <S.Date dateTime={dateTime}>
            {new Intl.DateTimeFormat("default", intlOptions).format(
              new Date(message.date)
            )}
          </S.Date>
        )}

        {tags && (
          <S.Tagger dateTime={dateTime}>
            {tags.map(t => (
              <S.Tag key={t}>{t}</S.Tag>
            ))}
          </S.Tagger>
        )}
      </S.Bubble>
    </S.Item>
  )
}

// Message.propTypes = {
//   message: PropTypes.shape({
//     date: PropTypes.instanceOf(Date),
//     author: PropTypes.string,
//     message: PropTypes.string,
//   }).isRequired,
//   media: PropTypes.objectOf(PropTypes.object),
//   color: PropTypes.string,
//   isActiveUser: PropTypes.bool,
//   tags: PropTypes.arrayOf(PropTypes.string),
//   sameAuthorAsPrevious: PropTypes.bool,
// }

// Message.defaultProps = {
//   color: "black",
//   isActiveUser: false,
//   sameAuthorAsPrevious: false,
//   media: null,
//   tags: null,
// }

export default Message
