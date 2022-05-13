# Tabber

`import Tabber from 'app/components/tabber';`

`Tabber` is a wrapper around [react-tabs](https://github.com/rackt/react-tabs) with a few tweaks made to suit the purposes of the client.
Therefore, anything on covered in this document is likely explained in the [react-tabs documentation](https://github.com/rackt/react-tabs#example).

# Example

```javascript
import Tabber from 'app/components/tabber';

class TabberExample extends React.Component {
  render() {
    return (
      <Tabber
        tabs={[
          {
            title: 'Tab 1',
            component: () => <p>This is the content for Tab 1</p>,
          },
          {
            title: 'Tab 2',
            component: () => <p>This is the content for Tab 2</p>,
          },
        ]}
      />
    );
  }
}
```
