$(document).ready(() => {
    $('.del').on('click', (item) => {
       $element = $(item.target)

        $.ajax({
            type: "DELETE",
            url: "/delete/"+$element.attr('data-id'),
            
            success: (data) => {
                alert("Ma'lumot o'chirildi.")
                window.location.href = "/"
            },

            error: (error) => {
                alert(error)
            }
        })
    })
})