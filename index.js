$(document).ready(function () {
    const peopleList = $('#peopleList');

    // Function to fetch and display people
    function fetchPeople() {
        $.ajax({
            url: 'mongodb://localhost:27017',
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: true,
            },
            dataType: 'json',
            success: function (data) {
                peopleList.empty(); 

                $.each(data, function (index, person) {
                    const listItem = $('<li>').text(`id: ${person.id}, name: ${person.name}, marks: ${person.marks}`);

                    // Add update and delete buttons
                    const updateButton = $('<button>').text('Update').on('click', function () {
                        updatePerson(person._id);
                    });

                    const deleteButton = $('<button>').text('Delete').on('click', function () {
                        deletePerson(person._id);
                    });

                    listItem.append(updateButton, deleteButton);
                    peopleList.append(listItem);
                });
            },
            error: function (error) {
                console.error('Error fetching people:', error);

            });
        }
    }
    });
    